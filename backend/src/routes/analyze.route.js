import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { runLighthouseAudit } from '../utils/lighthouse.js';
import { runAxeAudit } from '../utils/axecore.js';
import Report from '../models/report.model.js';


const router = express.Router();
// Analyse URL (PROTECTED)
router.post('/',authMiddleware,async(req, res)=>{
    
    try {
         const {url} = req.body;

        // Validate URL provided
        if(!url){
            return res.status(400).json({
                success:false,
                message:'Please provide a URL to analyze'
            });
        }
        //Validate URL format
        try {
            new URL(url);
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:'Invalid URL format. Include http:// or https://'
            });
            
        }
        console.log(`\n📊 Starting analysis for: ${url}`);
        console.log(`👤 Requested by user: ${req.user.id}`);

        const [lighthouseScore, axeResults] = await Promise.all([
        runLighthouseAudit(url),
        runAxeAudit(url)
        ]);
        // save report
        const report = new Report({
            userId: req.user.id,
            url,
            lighthouseScore,
            axeResults
        });
        await report.save();
        console.log(`💾 Report saved with ID: ${report._id}\n`);

        res.json({
            success:true,
            message: 'Analysis completed successfully',
            reportId: report._id,
            data:{
                url,
                lighthouseScore,
                axeResults:{
                    violations: axeResults.violations,
                    violationsCount: axeResults.violations.length,
                    passes: axeResults.passes,
                    incomplete: axeResults.incomplete
                },
                timestamp:report.timestamp
            }
        });
    } catch (error) {
        console.error('❌ Analysis error:', error);
        res.status(500).json({
            success: false,
            message:'Failed to complete analysis',
            error: error.message
        })   
    }
});
export default router;