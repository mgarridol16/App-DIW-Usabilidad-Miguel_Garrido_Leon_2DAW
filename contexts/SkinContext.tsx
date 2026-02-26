import React, { createContext, useContext, useState, ReactNode } from "react";

// Tipos de skins disponibles
export type SkinType = "base" | "alternative" | "final";

// Interfaz del contexto
interface SkinContextType {
  currentSkin: SkinType;
  setSkin: (skin: SkinType) => void;
}

// Crear el contexto
const SkinContext = createContext<SkinContextType | undefined>(undefined);

// Provider del contexto
interface SkinProviderProps {
  children: ReactNode;
}

export const SkinProvider: React.FC<SkinProviderProps> = ({ children }) => {
  // La skin por defecto es 'final' (la correcta)
  const [currentSkin, setCurrentSkin] = useState<SkinType>("final");

  const setSkin = (skin: SkinType) => {
    setCurrentSkin(skin);
    // Aplicar la clase correspondiente al body
    document.body.className = `bg-light skin-${skin}`;
  };

  // Aplicar la clase inicial al montar el componente
  React.useEffect(() => {
    document.body.className = `bg-light skin-${currentSkin}`;
  }, []);

  return (
    <SkinContext.Provider value={{ currentSkin, setSkin }}>
      {children}
    </SkinContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useSkin = (): SkinContextType => {
  const context = useContext(SkinContext);
  if (!context) {
    throw new Error("useSkin debe usarse dentro de un SkinProvider");
  }
  return context;
};
