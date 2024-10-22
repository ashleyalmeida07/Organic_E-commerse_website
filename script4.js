document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const carbonFootprint = parseFloat(document.getElementById('carbonFootprint').value);
    const packagingImpact = parseInt(document.getElementById('packagingImpact').value);
    const environmentalImpact = parseInt(document.getElementById('environmentalImpact').value);

    const sustainabilityScore = calculateSustainabilityScore(carbonFootprint, packagingImpact, environmentalImpact);

    const ratingsList = document.getElementById('ratingsList');
    const listItem = document.createElement('li');
    listItem.textContent = `${productName} :  Score: ${sustainabilityScore.toFixed(2)} (Carbon: ${carbonFootprint}, Packaging: ${packagingImpact}, Environmental: ${environmentalImpact})`;
    ratingsList.appendChild(listItem);

    // Clear the form
    document.getElementById('productForm').reset();
});

function calculateSustainabilityScore(carbon, packaging, environmental) {
    // Simple scoring algorithm: lower carbon footprint is better, higher packaging/environmental impact is better
    return (10 - carbon) + packaging + environmental;
}
