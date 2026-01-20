// models/Career.js 
import mongoose from "mongoose";

const roadmapStageSchema = new mongoose.Schema({
    title: { type: String, required: true }, // e.g. "Foundation Stage" 
    description: { type: String, required: true }, // e.g. "High School Math, IT" 
    resources: { type: [String], default: [] } // helpful links 
});

const careerSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }, // e.g. "Software Developer"
    overview: { type: String, required: true },
    requiredSkills: { type: [String], default: [] },
    educationPath: { type: String },
    avgSalary: { type: String },
    categories: { type: [String], default: [] }, // e.g. ["Technology"] 
    roadmap: { type: [roadmapStageSchema], default: [] },
}, { timestamps: true }); // adds createdAt & updatedAt automatically

export default mongoose.model("Career", careerSchema);