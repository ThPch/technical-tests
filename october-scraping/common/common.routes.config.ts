import express from 'express';

//Le keyword abstract permet d'avoir une fonctionnalité similaire entre plusieurs classes (comme par exemple la configuration de l'API endpoint), une sorte d'heritage qui permet de customiser une implémentation
export abstract class CommonRoutesConfig {
    app: express.Application;
    name: string;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }

    //ça force chaque classe extending CommonRoutesConfig à fournir une implémentation qui match cette signature, si elle n'y est pas, TypeScript compiler erreur
    abstract configureRoutes(): express.Application;
}
