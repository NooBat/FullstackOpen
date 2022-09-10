"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(patientService_1.default.getSecuredEntries());
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient = patientService_1.default.findByPatientId(id);
    if (!patient) {
        res.status(404).end();
    }
    else {
        res.send(patient);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.default)(req.body);
        const newPatient = patientService_1.default.addPatient(newPatientEntry);
        res.json(newPatient);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).send({ error: e.message });
        }
    }
});
exports.default = router;
