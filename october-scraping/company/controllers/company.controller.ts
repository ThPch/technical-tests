import express from 'express';
import CompanyService from '../services/company.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:Companies-controller');
class CompanyController {
    async getCompanyNumber(req: express.Request, res: express.Response) {
        let siret: string = req.params.siret as string;
        const CompanyInfo = await CompanyService.getCompanyNumber(siret);

        if(CompanyInfo.err) {
            res.status(CompanyInfo.statusCode).send(CompanyInfo);
        } else {
            res.status(200).send(CompanyInfo);
        }

    }
}

export default new CompanyController();
