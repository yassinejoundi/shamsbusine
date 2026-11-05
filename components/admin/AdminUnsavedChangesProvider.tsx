"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type UnsavedChangesContextValue = {
  markDirty: (sectionId: string) => void;
  markClean: (sectionId: string) => void;
  requestNavigation: (navigate: () => void) => void;
};

const UnsavedChangesContext = createContext<UnsavedChangesContextValue | null>(null);

export function AdminUnsavedChangesProvider({ children }: { children: ReactNode }) {
  const [dirtySections, setDirtySections] = useState<Set<string>>(() => new Set());
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (pendingNavigation && !dialog.open) dialog.showModal();
    else if (!pendingNavigation && dialog.open) dialog.close();
  }, [pendingNavigation]);

  const markDirty = useCallback((sectionId: string) => {
    setDirtySections((current) => new Set(current).add(sectionId));
  }, []);

  const markClean = useCallback((sectionId: string) => {
    setDirtySections((current) => {
      if (!current.has(sectionId)) return current;
      const next = new Set(current);
      next.delete(sectionId);
      return next;
    });
  }, []);

  const requestNavigation = useCallback((navigate: () => void) => {
    if (dirtySections.size === 0) {
      navigate();
      return;
    }
    setPendingNavigation(() => navigate);
  }, [dirtySections]);

  function continueEditing() {
    setPendingNavigation(null);
  }

  function discardAndNavigate() {
    const navigate = pendingNavigation;
    setDirtySections(new Set());
    setPendingNavigation(null);
    navigate?.();
  }

  return (
    <UnsavedChangesContext.Provider value={{ markDirty, markClean, requestNavigation }}>
      {children}
      <dialog
        ref={dialogRef}
        className="admin-unsaved-dialog"
        aria-labelledby="admin-unsaved-title"
        aria-describedby="admin-unsaved-description"
        onCancel={(event) => {
          event.preventDefault();
          continueEditing();
        }}
      >
        <p className="admin-eyebrow">Espace de gestion</p>
        <h2 id="admin-unsaved-title">Modifications non enregistrées</h2>
        <p id="admin-unsaved-description">Certaines modifications ne sont pas enregistrées. Voulez-vous continuer à modifier cette page ou les abandonner pour changer de page ?</p>
        <div className="admin-unsaved-actions">
          <button className="admin-sidebar-action" type="button" autoFocus onClick={continueEditing}>Continuer à modifier</button>
          <button className="button" type="button" onClick={discardAndNavigate}>Abandonner et changer de page</button>
        </div>
      </dialog>
    </UnsavedChangesContext.Provider>
  );
}

export function useAdminUnsavedChanges() {
  const context = useOptionalAdminUnsavedChanges();
  if (!context) throw new Error("useAdminUnsavedChanges must be used inside AdminUnsavedChangesProvider.");
  return context;
}

export function useOptionalAdminUnsavedChanges() {
  return useContext(UnsavedChangesContext);
}
