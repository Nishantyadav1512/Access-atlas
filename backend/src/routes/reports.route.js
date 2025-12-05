import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import Report from '../models/report.model.js';

const router = express.Router();

// Get all user reports
router.get('/', authMiddleware ,async (req, res)=>{
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page-1)*limit;
        const reports = await Report.find({userId:req.user.id})
        .sort({timestamp:-1})
        .select('url lighthouseScore axeResults timestamp')
        .skip(skip)
        .limit(limit);

        const total = await Report.countDocuments({userId: req.user.id});
        res.json({
            success:true,
            count :reports.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            reports:reports.map(report=>({
                id:report._id,
                url:report.url,
                lighthouseScore: report.lighthouseScore,
                violationsCount: report?.axeResults?.violations?.length || 0,
                timestamp: report.timestamp
            }))
        });

    } catch (error) {
        console.error('Get reports error:', error);
        res.status(500).json({
            success:false,
            message:'Failed to fetch reports'
        });
    }
});
// get a single report
router.get('/:id' ,  authMiddleware , async(req,res)=>{
    try {
        const report = await Report.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if(!report){
            return res.status(404).json({
                success:false,
                message:'Report not found'
            });
        }
        res.json({
            success:true,
            report
        });

    } catch (error) {
        console.error('Get report error:', error);
        res.status(500).json({
            success:false,
            message:'Failed to fetch report'
        }); 
    }
});

// delete report
router.delete('/:id' , authMiddleware , async(req,res)=>{
    try {
        const report = await Report.findOneAndDelete({
            _id:req.params.id,
            userId:req.user.id
        });
        if(!report){
            return res.status(404).json({
                success:false,
                message:'Report not found'
            });
        }
        res.json({
            success:true,
            message:'Report deleted successfully'
        })
    } catch (error) {
        console.error('Delete report error:', error);
        res.status(500).json({
            success:false,
            message:'Failed to delete report'
        });
    }
})
export default router;
