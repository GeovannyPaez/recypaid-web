/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { API_URL } from '@/core/config';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectWithSearchProps {
  apiUrl?: string;
  endpoint: string;
  params?: Record<string, string>;
  placeholder?: string;
  onSelect: (value: string) => void;
  maperOptions: (item: any) => SelectOption;
  disabled?: boolean;
  value?: string;
  clearable?: boolean;
  clearLabel?: string;
}

const SelectWithSearch = ({
  apiUrl = API_URL,
  endpoint,
  params = {},
  placeholder = "Select an item...",
  onSelect,
  maperOptions,
  disabled,
  value,
  clearable = false,
  clearLabel = "Sin selección",
}: SelectWithSearchProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const [hasLoadedOptions, setHasLoadedOptions] = useState(false);
  const session = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Caché simple para evitar consultas repetidas
  const cacheRef = useRef<Map<string, SelectOption[]>>(new Map());

  const fetchOptions = async (searchTerm = "") => {
    if (disabled || !session?.data?.user?.token) return;
    
    // Crear clave de caché basada en parámetros y término de búsqueda
    const cacheKey = `${JSON.stringify(params)}-${searchTerm}`;
    
    // Verificar caché primero
    if (cacheRef.current.has(cacheKey)) {
      const cachedOptions = cacheRef.current.get(cacheKey)!;
      setOptions(cachedOptions);
      return cachedOptions;
    }
    
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({ ...params, search: searchTerm });
      const response = await fetch(`${apiUrl}/${endpoint}?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${session.data.user.token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch options");

      const data = await response.json();
      if (Array.isArray(data)) {
        const mappedOptions = data.map(maperOptions);
        
        // Guardar en caché
        cacheRef.current.set(cacheKey, mappedOptions);
        
        // Limitar el tamaño del caché (mantener solo los últimos 20 resultados)
        if (cacheRef.current.size > 20) {
          const firstKey = cacheRef.current.keys().next().value;
          cacheRef.current.delete(firstKey || '');
        }
        
        setOptions(mappedOptions);
        return mappedOptions;
      } else {
        console.error("API response is not an array", data);
        setOptions([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching options:", error);
      setOptions([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Efecto para manejar el valor inicial
  useEffect(() => {
    if (!session?.data?.user?.token || initialLoadCompleted) return;

    const loadInitialData = async () => {
      if (value) {
        // Primero buscamos específicamente el valor por defecto
        const specificResults = await fetchOptions(value);
        const foundOption = specificResults?.find(option => option.value === value);

        if (foundOption) {
          setSelectedOption(foundOption);
          setOptions(specificResults || []);
        } else {
          // Si no lo encontramos, cargamos opciones generales pero mantenemos el valor seleccionado
          await fetchOptions("");
          const generalResults = await fetchOptions("");
          const optionInGeneral = generalResults?.find(option => option.value === value);
          if (optionInGeneral) {
            setSelectedOption(optionInGeneral);
          } else {
            // Si no está en los resultados generales, lo mostramos como está
            setSelectedOption({ value: value, label: value });
          }
        }
      }
      // Si no hay valor, NO cargamos opciones iniciales - esperamos a que el usuario abra el dropdown
      setInitialLoadCompleted(true);
    };

    loadInitialData();
  }, [session?.data?.user?.token, value]);

  // Fetch con debounce al escribir en la búsqueda (solo después de carga inicial)
  useEffect(() => {
    if (!initialLoadCompleted || !open) return;

    const timeoutId = setTimeout(() => {
      fetchOptions(search);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [search, open, initialLoadCompleted]);

  // Cargar opciones cuando se abre el dropdown por primera vez (si no había un value inicial)
  useEffect(() => {
    if (open && initialLoadCompleted && !hasLoadedOptions) {
      fetchOptions("");
      setHasLoadedOptions(true);
    }
  }, [open, initialLoadCompleted]);

  // Recargar opciones cuando cambian los params (dependencias)
  useEffect(() => {
    if (!initialLoadCompleted) return;

    // Limpiar caché cuando cambian los parámetros
    cacheRef.current.clear();
    
    // Solo recargar si realmente cambiaron los parámetros importantes
    // Resetear estado de carga para forzar nueva carga
    setHasLoadedOptions(false);
    setOptions([]);
    // No resetear la selección automáticamente - dejar que el usuario decida
    if (open) {
      fetchOptions(search);
      setHasLoadedOptions(true);
    }
  }, [JSON.stringify(params), initialLoadCompleted]);

  // Cierre del dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Actualizar selectedOption cuando cambia el value (desde fuera)
  useEffect(() => {
    if (value && initialLoadCompleted) {
      const option = options.find(opt => opt.value === value);
      if (option) {
        // Solo actualizar si encontramos la opción en los resultados actuales
        setSelectedOption(option);
      } else if (!selectedOption || selectedOption.value !== value) {
        // Solo crear una opción temporal si no tenemos una selectedOption válida
        // o si el valor ha cambiado externamente
        setSelectedOption({ value: value, label: value });
      }
      // Si ya tenemos un selectedOption con el valor correcto, lo mantenemos
    } else if (!value) {
      // Si value es null/undefined, limpiar la selección
      setSelectedOption(null);
    }
  }, [value, options, initialLoadCompleted]);

  const handleSelect = (option: SelectOption) => {
    setSelectedOption(option);
    onSelect(option.value);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!initialLoadCompleted) return;
          setOpen(!open);
          // No limpiar el search cuando se abre - mantener la búsqueda anterior
        }}
        className={cn([
          "w-full flex items-center justify-between px-3 py-2 text-sm border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
          disabled && "opacity-50 cursor-not-allowed",
        ])}
      >
        <span className="block truncate">
          {selectedOption?.label || placeholder}
        </span>
        <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute z-10 w-full mt-1 bg-background rounded-md shadow-lg border border-input">
          <div className="p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background"
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {loading ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">Cargando...</div>
            ) : options.length === 0 && !clearable ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">No hay resultados.</div>
            ) : (
              <ul className="py-1">
                {clearable && (
                  <li
                    key="__clear__"
                    onClick={() => {
                      setSelectedOption(null);
                      onSelect("");
                      setOpen(false);
                    }}
                    className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent border-b"
                  >
                    <span className="w-4 h-4 mr-2">
                      {!selectedOption && <Check className="w-4 h-4 text-primary" />}
                    </span>
                    <span className="text-muted-foreground italic">{clearLabel}</span>
                  </li>
                )}
                {options.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent"
                  >
                    <span className="w-4 h-4 mr-2">
                      {selectedOption?.value === option.value && <Check className="w-4 h-4 text-primary" />}
                    </span>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectWithSearch;