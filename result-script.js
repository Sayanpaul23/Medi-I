document.addEventListener('DOMContentLoaded', function () {
    // Retrieve form data from localStorage
    const formData = JSON.parse(localStorage.getItem('insuranceFormData'));

    if (!formData) {
        document.getElementById('result').innerHTML = "<p>No form data found. Please fill out the form.</p>";
        return;
    }

    // Destructure formData
    const { name, age, sex, bmi, smoker, healthIssues, preferences } = formData;

    // Generate Recommendation based on form input
    const recommendation = generateRecommendation(name, age, sex, bmi, smoker, healthIssues, preferences);

    // Display the recommendation in the result section
    document.getElementById('result').innerHTML = recommendation;
});

function generateRecommendation(name, age, sex, bmi, smoker, healthIssues, preferences) {
    // Convert age and bmi to numbers for comparison
    const ageNum = parseInt(age);
    const bmiNum = parseFloat(bmi);

    // Define some real Indian market insurance plans
    let plans = [];

    if (ageNum < 30 && smoker === 'no' && bmiNum < 25) {
        plans.push({
            title: "ICICI Lombard Complete Health Insurance",
            details: "Best for young individuals with no pre-existing health conditions. Offers comprehensive coverage, cashless hospitalization, and wellness benefits.",
            premium: "₹10,000 per year",
            coverage: "₹5 Lakh"
        });
    } 
    if (ageNum > 40 && healthIssues.includes('pressure') && smoker === 'yes') {
        plans.push({
            title: "Max Bupa Heartbeat Health Insurance",
            details: "Tailored for those with pre-existing conditions like high blood pressure. Includes coverage for heart-related issues, preventive health check-ups, and free doctor consultations.",
            premium: "₹20,000 per year",
            coverage: "₹10 Lakh"
        });
    } 
    if (bmiNum >= 25 || healthIssues.includes('diabetes') || healthIssues.includes('thyroid')) {
        plans.push({
            title: "Star Health Diabetes Safe Insurance Policy",
            details: "Specifically designed for individuals with chronic conditions like diabetes. Covers hospitalization, doctor visits, and regular health check-ups.",
            premium: "₹18,000 per year",
            coverage: "₹5 Lakh"
        });
    }
    if (preferences === 'immediateFunds') {
        plans.push({
            title: "Religare Care Health Insurance",
            details: "For those looking for immediate coverage, this plan includes accident coverage, emergency hospitalization, and cashless treatment.",
            premium: "₹12,000 per year",
            coverage: "₹5 Lakh"
        });
    }

    // Fallback recommendation if no specific conditions are met
    if (plans.length === 0) {
        plans.push({
            title: "HDFC ERGO Optima Restore Family Plan",
            details: "A balanced family health plan covering maternity, child healthcare, and chronic illness. Includes a coverage restoration feature.",
            premium: "₹15,000 per year",
            coverage: "₹7.5 Lakh"
        });
    }

    // Create recommendation message
    let message = `<h3>Hi ${name}, based on the details you provided, we recommend the following insurance plan(s):</h3>`;
    plans.forEach((plan, index) => {
        message += `<div class="plan-recommendation">
                        <h4>Plan ${index + 1}: ${plan.title}</h4>
                        <p><strong>Details:</strong> ${plan.details}</p>
                        <p><strong>Premium:</strong> ${plan.premium}</p>
                        <p><strong>Coverage:</strong> ${plan.coverage}</p>
                    </div><br>`;
    });

    return message;
}
