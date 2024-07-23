import { Router } from "express";
import { EvidenceController } from "./evidence.controller";

export default (router: Router) => {
    router.post("/evidence/addEvidence" , EvidenceController.add),
    router.get("/evidence/getAll" , EvidenceController.getAll),
    router.post("/evidence/changeStatus/:id" , EvidenceController.changeStatus)
};