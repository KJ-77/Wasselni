// src/components/AddressAutocomplete.tsx
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useDebounce } from "@/hooks/useDebounce";
import {
  fetchAutocompleteSuggestions,
  type AutocompleteResponse,
} from "@/services/MapService";

interface AddressAutocompleteProps {
  onPlaceSelected: (place: AutocompleteResponse) => void;
  defaultValue?: string;
  placeholder?: string;
}

export const AddressAutocomplete = ({
  onPlaceSelected,
  defaultValue = "",
  placeholder = "Enter an address",
}: AddressAutocompleteProps) => {
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<AutocompleteResponse[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsLoading(true);
      fetchAutocompleteSuggestions(debouncedQuery)
        .then((data) => {
          // MapService returns pre-validated suggestions
          setSuggestions(data);
          setShowSuggestions(data.length > 0);
        })
        .catch((error) => {
          console.error("Autocomplete error:", error);
          setSuggestions([]);
          setShowSuggestions(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (suggestion: AutocompleteResponse) => {
    setQuery(suggestion.address);
    onPlaceSelected(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => query.length > 2 && setShowSuggestions(true)}
        placeholder={placeholder}
        className="w-full"
      />
      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <Card className="absolute z-10 w-full mt-1 shadow-lg">
          <CardContent className="p-2">
            {isLoading ? (
              <div className="p-2 text-sm text-muted-foreground">Loading suggestions...</div>
            ) : suggestions.length > 0 ? (
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => handleSelect(suggestion)}
                    className="p-2 cursor-pointer hover:bg-muted rounded transition-colors"
                  >
                    {suggestion.address}
                  </li>
                ))}
              </ul>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
