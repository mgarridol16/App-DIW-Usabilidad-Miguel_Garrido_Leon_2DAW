import React from "react";
import { useSkin } from "../contexts/SkinContext";
import type { SkinType } from "../contexts/SkinContext";

export const SkinSelector: React.FC = () => {
  const { currentSkin, setSkin } = useSkin();

  const skins: {
    value: SkinType;
    label: string;
    icon: string;
    description: string;
  }[] = [
    {
      value: "base",
      label: "Skin Base",
      icon: "fas fa-times-circle",
      description: "Problemas de usabilidad y responsive",
    },
    {
      value: "alternative",
      label: "Skin Alternativa",
      icon: "fas fa-exclamation-triangle",
      description: "Problemas de accesibilidad",
    },
    {
      value: "final",
      label: "Skin Correcta",
      icon: "fas fa-check-circle",
      description: "Usabilidad y accesibilidad óptimas",
    },
  ];

  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
        type="button"
        id="skinSelectorDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-label="Seleccionar tema visual"
      >
        <i className="fas fa-palette"></i>
        <span className="d-none d-lg-inline">Skin</span>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="skinSelectorDropdown"
      >
        <li className="dropdown-header">Seleccione una visualización</li>
        {skins.map((skin) => (
          <li key={skin.value}>
            <button
              className={`dropdown-item d-flex align-items-start gap-2 ${currentSkin === skin.value ? "active" : ""}`}
              onClick={() => setSkin(skin.value)}
            >
              <i
                className={`${skin.icon} mt-1 ${
                  skin.value === "base"
                    ? "text-danger"
                    : skin.value === "alternative"
                      ? "text-warning"
                      : "text-success"
                }`}
              ></i>
              <div>
                <div className="fw-bold">{skin.label}</div>
                <small className="text-muted">{skin.description}</small>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
