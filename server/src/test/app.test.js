const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../index');
const userModel = require('../models/user.model');

chai.should();
chai.use(chaiHttp);

describe('Creacion de cuenta', ()=> {
    describe('POST /user creacion de cuanta exitosa', (done)=> {
        it('debe retornar un status 201 CREATE', (done)=> {
            const usuario = {
                name: "test",
                lastName: "test",
                age: 1,
                email: "test@hotmail.com",
                password: "test123"
            };

            chai.request(app)
                .post('/user/registrar')
                .send(usuario)
                .end((err,response)=> {
                    response.should.have.status(201);
                    response.should.be.an('object');
                    done();
                 });
        });

        after(async ()=> {
            await userModel.deleteOne({email:'test@hotmail.com'})
        });
    });
});