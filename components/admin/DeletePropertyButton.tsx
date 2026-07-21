"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePropertyButton({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteProperty() {
    if (!window.confirm(`Delete ${propertyId}? This cannot be undone.`)) return;

    setIsDeleting(true);
    const response = await fetch(`/api/admin/properties/${encodeURIComponent(propertyId)}`, {
      method: "DELETE",
    });
    setIsDeleting(false);

    if (!response.ok) {
      const result = await response.json();
      window.alert(result.error || "Unable to delete property.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={deleteProperty}
      disabled={isDeleting}
      className="text-sm font-bold text-red-700 transition hover:text-red-900 disabled:opacity-60"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
