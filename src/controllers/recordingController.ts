import { RequestHandler } from 'express';
import RecordingService from '../services/RecordingService';

export const create: RequestHandler = (req, res, next) => {
    const parentId = req.body.parentId;
    const childId = req.body.childId;
    
}