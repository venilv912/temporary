// SearchResult.js
import React from "react";

export default function SearchResult() {
    const properties = [
        { id: 1, name: "Luxury Villa in Beverly", price: "$5,000", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuGXnjgjKDyb2NfYx60qN3PZsjtv9sFwb5a7UuQLwFpWGA9Aa-eIvpvMpcOa7JWz4Oc-o&usqp=CAU" },
        { id: 2, name: "Spacious Apartment", price: "$2,500", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7l7ShCsMStw1aUrP74tliSTZh6adfi0oFGjdgjJDHO6x5kxL6pL-wHBGEv-KMJezTAMw&usqp=CAU " },
        { id: 3, name: "Luxury House in Miami", price: "$10,000", imageUrl: "https://eycrk5cno2n.exactdn.com/wp-content/uploads/2022/02/The-Importance-of-High-Quality-Real-Estate-Photos-v3.jpg?strip=all&lossy=1&ssl=1" },
        { id: 4, name: "Beach House", price: "$3,500", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7l7ShCsMStw1aUrP74tliSTZh6adfi0oFGjdgjJDHO6x5kxL6pL-wHBGEv-KMJezTAMw&usqp=CAU" },
        { id: 1, name: "Luxury Villa in Beverly", price: "$5,000", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuGXnjgjKDyb2NfYx60qN3PZsjtv9sFwb5a7UuQLwFpWGA9Aa-eIvpvMpcOa7JWz4Oc-o&usqp=CAU" },
        { id: 2, name: "Spacious Apartment", price: "$2,500", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7l7ShCsMStw1aUrP74tliSTZh6adfi0oFGjdgjJDHO6x5kxL6pL-wHBGEv-KMJezTAMw&usqp=CAU " },
        // Add more properties as needed
    ];

    return (
        <div style={styles.app}>
            <header style={styles.header}>
                <input type="text" placeholder="Search Properties" style={styles.searchBar} />
                <button style={styles.searchButton}>Search</button>
            </header>

            <div style={styles.container}>
                {/* Left Sidebar Filters */}
                <aside style={styles.sidebar}>
                    <div style={styles.filterSection}>
                        <h2>Filter by:</h2>
                        
                        {/* Price Range */}
                        <label>Price Range</label>
                        <div style={styles.priceRange}>
                            <input type="text" placeholder="$0.0" style={styles.priceInput} />
                            <input type="text" placeholder="$5000.0" style={styles.priceInput} />
                        </div>
                        <input type="range" min="0" max="5000" style={styles.rangeInput} />

                        {/* Apartments Filter */}
                        <div style={styles.filterGroup}>
                            <h3>Apartments</h3>
                            <div style={styles.filterOption}><input type="radio" name="apartments" /> <label>Apartme (5)</label></div>
                            <div style={styles.filterOption}><input type="radio" name="apartments" /> <label>House B (2)</label></div>
                            <div style={styles.filterOption}><input type="radio" name="apartments" /> <label>Apartme (3)</label></div>
                        </div>

                        {/* Type Filter */}
                        <div style={styles.filterGroup}>
                            <h3>Type</h3>
                            <div style={styles.filterOption}><input type="radio" name="type" /> <label>Pet-friendly (2)</label></div>
                            <div style={styles.filterOption}><input type="radio" name="type" /> <label>Furnished (1)</label></div>
                            <div style={styles.filterOption}><input type="radio" name="type" /> <label>Unfurn (3)</label></div>
                        </div>

                        {/* Bedrooms Filter */}
                        <div style={styles.filterGroup}>
                            <h3>Bedrooms</h3>
                            <div style={styles.filterOption}><input type="radio" name="bedrooms" /> <label>Ame Fe</label></div>
                            <div style={styles.filterOption}><input type="radio" name="bedrooms" /> <label>Prop Pri</label></div>
                            <div style={styles.filterOption}><input type="radio" name="bedrooms" /> <label>2 Ne</label></div>
                            <div style={styles.filterOption}><input type="radio" name="bedrooms" /> <label>Loca (4)</label></div>
                        </div>
                    </div>
                </aside>

                {/* Property Listings */}
                <section style={styles.propertyList}>
                    <div style={styles.resultsHeader}>
                        <h2>20 search results for 2-bedroom</h2>
                        <select style={styles.sortDropdown}>
                            <option>Sort by: Most Relevant</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>

                    <div style={styles.grid}>
                        {properties.map((property) => (
                            <div key={property.id} style={styles.propertyCard}>
                                <img src={property.imageUrl} alt={property.name} style={styles.propertyImage} />
                                <h3 style={styles.propertyName}>{property.name}</h3>
                                <p style={styles.propertyPrice}>{property.price}</p>
                                <button style={styles.detailsButton}>View Details</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

const styles = {
    app: {
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        width: "100vw",
    },
    header: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    },
    searchBar: {
        flex: 1,
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    searchButton: {
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
    container: {
        display: "flex",
        flex: "1",
        marginTop: "60px",
        overflow: "hidden",
    },
    sidebar: {
        width: "250px",
        padding: "1rem",
        backgroundColor: "#e0e0e0",
        borderRight: "1px solid #ddd",
        overflowY: "auto",
    },
    filterSection: {
        marginBottom: "1rem",
    },
    priceRange: {
        display: "flex",
        justifyContent: "space-between",
    },
    priceInput: {
        width: "45%",
        padding: "0.25rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    rangeInput: {
        width: "100%",
        margin: "0.5rem 0",
    },
    filterGroup: {
        marginBottom: "1rem",
    },
    filterOption: {
        display: "flex",
        alignItems: "center",
        marginBottom: "0.5rem",
    },
    propertyList: {
        flex: "1",
        padding: "1rem",
        overflowY: "auto",
    },
    resultsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
    },
    sortDropdown: {
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(333px, 1fr))",
        gap: "1rem",
    },
    propertyCard: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#fff",
        textAlign: "center",
    },
    propertyImage: {
        width: "100%",
        height: "75%",
        borderRadius: "8px",
    },
    propertyName: {
        fontSize: "1rem",
        fontWeight: "bold",
        margin: "0.5rem 0",
    },
    propertyPrice: {
        color: "#28a745",
        fontSize: "0.9rem",
        margin: "0.5rem 0",
    },
    detailsButton: {
        backgroundColor: "#28a745",
        color: "#fff",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};
