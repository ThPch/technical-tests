import axios from 'axios';
import * as cheerio from 'cheerio';
import { html } from 'cheerio/lib/api/manipulation';
import { add } from 'cheerio/lib/api/traversing';

class CompanyService {
    async getCompanyNumber(siret: string = '') {

        try {
            const response = await axios.get(process.env.URL+siret);

            if(response.status == 200) {
                let $ = cheerio.load(response.data);
                let name = $('#identity').find('h1').text()
                let address = $('address').text();
                let telephone = $($('#identity-left').find('.text-format').find('.info').find('.info__col').find('h5')[1]).text();

                let numTel = (telephone == "Téléphone") ? $($('#identity-left').find('.text-format').find('.info').find('.info__col').find('p')[1]).text().replace(/\s+/g, '') : "Telephone number not found"

                return {
                    company_siret : siret,
                    company_name : name,
                    company_tel : numTel,
                    company_address : address,
                }
            }


        } catch (err) {
            return {
                        err : true,
                        statusCode : err.response.status,
                        message : err.response.statusText
                    }
        }
    }
}

export default new CompanyService();
