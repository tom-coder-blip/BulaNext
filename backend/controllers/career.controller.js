// controllers/career.controller.js 
import Career from "../models/Career.js";

// === Get all careers (with optional filters) === 
export const getCareers = async (req, res) => {
    try {
        const filter = {};
        if (req.query.search) {
            filter.title = { $regex: req.query.search, $options: "i" };
        }
        if (req.query.category) {
            filter.categories = { $regex: req.query.category, $options: "i" };
        }

        const careers = await Career.find(filter);
        res.status(200).json(careers);
    } catch (err) {
        console.error("❌ Get Careers Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// === Get single career by ID === 
export const getCareerById = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) return res.status(404).json({ message: "Career not found" });
        res.status(200).json(career);
    } catch (err) {
        console.error("❌ Get Career Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

