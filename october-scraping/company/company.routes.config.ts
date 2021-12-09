import {CommonRoutesConfig} from '../common/common.routes.config';
import CompanyController from './controllers/company.controller';
import express from 'express';

export class CompanyRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CompanyRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/company/:siret`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                next();
            })
            .get(CompanyController.getCompanyNumber)
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`Put requested for id ${req.params.siret}`);
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`Patch requested for id ${req.params.siret}`);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`Delete requested for id ${req.params.siret}`);
            });

        return this.app;
    }
}
