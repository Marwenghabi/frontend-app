// Composant parent utilisant le SearchBar
import React, { useState } from "react";
import { SearchBar } from "./SearchBar";

function ParentComponent() {
  const [data, setData] = useState([...votreDonnee]); // Remplacez par vos données réelles

  const handleSearch = (searchValue) => {
    // Effectuez la recherche ici en utilisant searchValue pour filtrer les données
    // Pour l'exemple, nous allons supposer que votreDonnee est un tableau d'objets avec une propriété "nom".
    const filteredData = votreDonnee.filter((item) =>
      item.nom.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {/* Affichez vos données filtrées ici */}
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.nom}</li>
        ))}
      </ul>
    </div>
  );
}

export default ParentComponent;
