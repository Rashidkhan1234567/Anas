const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Smart Symptom Checker (Diagnosis)
// @route   POST /api/ai/diagnose
// @access  Private/Doctor (Pro Plan Only restricted in middleware)
const diagnoseSymptoms = async (req, res) => {
  try {
    const { symptoms, age, gender, history } = req.body;

    if (!symptoms) {
        return res.status(400).json({ message: 'Symptoms are required' });
    }

    const prompt = `
      Act as an expert medical AI assistant. Analyze the following patient data:
      Symptoms: ${symptoms}
      Age: ${age || 'Not provided'}
      Gender: ${gender || 'Not provided'}
      Medical History: ${history || 'None'}

      Provide a brief JSON response strictly following this format:
      {
        "possibleConditions": ["Condition 1", "Condition 2"],
        "riskLevel": "Low/Medium/High/Critical",
        "suggestedTests": ["Test 1", "Test 2"]
      }
    `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Basic JSON extraction and parsing (handling markdown code blocks if gemini returns them)
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : responseText;
        
        let aiData;
        try {
           aiData = JSON.parse(jsonString);
        } catch (parseError) {
           console.error("Failed to parse AI response as JSON:", responseText);
           throw new Error("Invalid AI response format");
        }

        res.json(aiData);
    } catch (apiError) {
        console.error('Gemini API Error:', apiError);
        // Graceful fallback
        res.status(200).json({
           possibleConditions: ["Unable to fetch AI diagnosis at this moment"],
           riskLevel: "Unknown",
           suggestedTests: ["Please consult the doctor directly."],
           error: "AI service temporarily unavailable"
        });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Prescription Explanation
// @route   POST /api/ai/explain
// @access  Private/Patient (Pro Plan Only restricted in middleware)
const explainPrescription = async (req, res) => {
  try {
    const { prescriptionData } = req.body;

    if (!prescriptionData) {
        return res.status(400).json({ message: 'Prescription data is required' });
    }

    const prompt = `
      Act as a friendly, helpful AI pharmacist. Analyze the following prescription data:
      ${JSON.stringify(prescriptionData)}

      Provide a simplified explanation of the medicines, what they are for, and general lifestyle recommendations. 
      Respond in a brief JSON format:
      {
        "explanation": "Simple explanation of the medication...",
        "lifestyleRecommendations": ["Advice 1", "Advice 2"]
      }
    `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : responseText;
        
        let aiData;
        try {
           aiData = JSON.parse(jsonString);
        } catch (parseError) {
           console.error("Failed to parse AI response as JSON:", responseText);
           throw new Error("Invalid AI response format");
        }

        res.json(aiData);
    } catch (apiError) {
        console.error('Gemini API Error:', apiError);
        // Graceful fallback
        res.status(200).json({
           explanation: "AI explanation is temporarily unavailable. Please follow your doctor's instructions.",
           lifestyleRecommendations: ["Stay hydrated.", "Rest well."],
           error: "AI service temporarily unavailable"
        });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    diagnoseSymptoms,
    explainPrescription
};
