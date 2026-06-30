const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_API_KEY
});


const interviewReportSchema = z.object({
  matchScore: z.number(),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string().describe("Generate answers in short andd professional way")
    })
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum([
        "low",
        "medium",
        "high"
      ])
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string())
    })
  ),

  title: z.string()
});


async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription
}) {

  const prompt = `
Generate an interview report.

Candidate Resume:
${resume}

Candidate Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY JSON.

IMPORTANT:
- Generate minimum 5 technicalQuestions.
- Generate minimum 5 behavioralQuestions.
- Generate minimum 3 skillGaps.
- Generate minimum 7 days preparationPlan.
- Never return empty arrays.
- Follow the schema exactly.
`;

  const response = await ai.models.generateContent({

    model: "gemini-2.5-flash",

    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",
        properties: {
          matchScore: {
            type: "number"
          },

          technicalQuestions: {
            type: "array",
            minItems: 5,
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                intention: { type: "string" },
                answer: { type: "string" }
              },
              required: [
                "question",
                "intention",
                "answer"
              ]
            }
          },

          behavioralQuestions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                intention: { type: "string" },
                answer: { type: "string" }
              },
              required: [
                "question",
                "intention",
                "answer"
              ]
            }
          },

          skillGaps: {
            type: "array",
            minItems: 3,
            items: {
              type: "object",
              properties: {
                skill: { type: "string" },
                severity: {
                  type: "string",
                  enum: [
                    "low",
                    "medium",
                    "high"
                  ]
                }
              },
              required: [
                "skill",
                "severity"
              ]
            }
          },

          preparationPlan: {
            type: "array",
            items: {
              type: "object",
              properties: {
                day: { type: "number" },
                focus: { type: "string" },
                tasks: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              },
              required: [
                "day",
                "focus",
                "tasks"
              ]
            }
          },

          title: {
            type: "string"
          }

        },

        required: [
          "matchScore",
          "technicalQuestions",
          "behavioralQuestions",
          "skillGaps",
          "preparationPlan",
          "title"
        ]
      }
    }
  });


  const report = JSON.parse(response.text);
  console.log(JSON.stringify(report, null, 2));
  return report;
}


module.exports = generateInterviewReport;