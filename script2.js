document.getElementById('carbonForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Electricity Consumption
    const electricityConsumptionKWH = parseFloat(document.getElementById('electricityConsumptionKWH').value) || 0;
    const electricityConsumptionINR = parseFloat(document.getElementById('electricityConsumptionINR').value) || 0;

    
    const avgCostPerKWH = 6.3; 
    const monthlyConsumptionFromINR = electricityConsumptionINR / avgCostPerKWH;
    const totalElectricityConsumption = electricityConsumptionKWH + monthlyConsumptionFromINR;
    const yearlyElectricityCO2 = totalElectricityConsumption * 0.82 * 12; // kg CO2 per kWh

    // Cooking Footprint
    const lpgCylinders = parseFloat(document.getElementById('lpgCylinders').value) || 0;
    const gasUnits = parseFloat(document.getElementById('gasUnits').value) || 0;
    const lpgCO2 = lpgCylinders * 16.1; // kg CO2 per cylinder
    const gasCO2 = gasUnits * 2.3; // kg CO2 per unit
    const totalCookingCO2 = lpgCO2 + gasCO2;

    // Air Travel Footprint
    const flightType = document.getElementById('flightType').value;
    const numberOfFlights = parseFloat(document.getElementById('numberOfFlights').value) || 0;
    const averageDistance = parseFloat(document.getElementById('averageDistance').value) || 0;

    let flightCO2 = 0;
    if (flightType === 'short') {
        flightCO2 = numberOfFlights * (0.27 * averageDistance); // Short haul CO2 factor
    } else if (flightType === 'medium') {
        flightCO2 = numberOfFlights * (0.25 * averageDistance); // Medium haul CO2 factor
    } else if (flightType === 'long') {
        flightCO2 = numberOfFlights * (0.23 * averageDistance); // Long haul CO2 factor
    }

    // Driving Footprint
    const vehicle = document.getElementById('vehicle').value;
    const drivingDistance = parseFloat(document.getElementById('drivingDistance').value) || 0;
    let vehicleCO2 = 0;

    if (vehicle === 'petrol') {
        vehicleCO2 = drivingDistance * 0.120; // kg CO2 per km for petrol
    } else if (vehicle === 'diesel') {
        vehicleCO2 = drivingDistance * 0.164; // kg CO2 per km for diesel
    } else if (vehicle === 'electric') {
        vehicleCO2 = drivingDistance * 0.05; // kg CO2 per km for electric (lower emissions)
    }

    // Public Transport Footprint
    const publicTransportType = document.getElementById('publicTransportType').value;
    const publicTransportDistance = parseFloat(document.getElementById('publicTransportDistance').value) || 0;
    let publicTransportCO2 = 0;

    if (publicTransportType === 'bus') {
        publicTransportCO2 = publicTransportDistance * 0.205; // kg CO2 per km for bus
    } else if (publicTransportType === 'auto') {
        publicTransportCO2 = publicTransportDistance * 0.125; // kg CO2 per km for auto
    } else if (publicTransportType === 'train') {
        publicTransportCO2 = publicTransportDistance * 0.041; // kg CO2 per km for train
    }

    // Total CO2 Calculation
    const totalCO2 = yearlyElectricityCO2 + totalCookingCO2 + flightCO2 + (vehicleCO2 * 12) + (publicTransportCO2 * 12);
    
    document.getElementById('result').innerText = `Your estimated annual carbon footprint is ${totalCO2.toFixed(2)} kg CO2.`;
});
