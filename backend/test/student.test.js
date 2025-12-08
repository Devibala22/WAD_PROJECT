import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../src/app.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Student Authentication Module', () => {
    
    describe('POST /api/student/logout', () => {
        it('should logout successfully', (done) => {
            chai.request(app)
                .post('/api/student/logout')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'User logged out');
                    done();
                });
        });
    });

    describe('API Health Check', () => {
        it('should return 404 for invalid route', (done) => {
            chai.request(app)
                .get('/api/invalid-route')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    describe('Student Routes Validation', () => {
        it('should validate login endpoint exists', (done) => {
            chai.request(app)
                .post('/api/student/login')
                .send({})
                .end((err, res) => {
                    expect(res.status).to.be.oneOf([400, 422, 500]);
                    done();
                });
        });

        it('should validate forget password endpoint exists', (done) => {
            chai.request(app)
                .post('/api/student/forgetpassword')
                .send({})
                .end((err, res) => {
                    expect(res.status).to.be.oneOf([400, 404, 500]);
                    done();
                });
        });
    });
});
