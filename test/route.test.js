const app = require('../src')
const request = require('supertest')

describe('GET/getPosts', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/getPosts').send();
        expect(response.status).toBe(200)
    })

    test('should response with an array', async () => {
        const response = await request(app).get('/getPosts').send()
        expect(response.body).toBeInstanceOf(Array);
    })
});

describe('GET/getPost', () => {
    test('should response with a 200 status code when you send an id', async () => {
        const response = await request(app).get('/getPost/?id=3')
        expect(response.status).toBe(200)
    })

    test('should response with an array lengh 1 object', async () => {
        const res = await request(app).get('/getPost/?id=3')
        expect(res.body).toBeInstanceOf(Object)
    })

    test('should response with 404 status code when id was missing', async () => {
        const res = await request(app).get('/getPost').send()
        expect(res.status).toBe(404)
    })

    test('should response with message when id is missing', async () => {
        const res = await request(app).get('/getPost/')
        expect(res.body.message).toBe("Id is missing")
    })

    test('should response with 404 status code when post is not found', async () => {
        const res = await request(app).get('/getPost/?id=22')
        expect(res.status).toBe(404)
    })

    test('should response with the message Post not found', async () => {
        const res = await request(app).get('/getPost/?id=22')
        expect(res.body.message).toBe('Post not found')
    })

});


describe('POST/create', () => {
    test('should response with 200 status code', async () => {
        const array = {
            title: "Test post",
            description: "This's test post",
            date: "14/6/2023"
        }

        const res = await request(app).post('/create').send(array);
        expect(res.status).toBe(200)
    })

    test('should response with 500 status code when data is missing', async () => {
        const array = {
            title: "",
            description: "This's test post",
            date: "14/6/2023"
        }

        const res = await request(app).post('/create').send(array);
        expect(res.status).toBe(404)
    })

    test('should response with error message when data is missing', async () => {
        const array = {
            title: "Test Post",
            description: "",
            date: ""
        }

        const res = await request(app).post('/create').send(array);
        expect(res.body.message).toBe("Data is missing")
    })

    test('should response with 500 status code when the data type of post is incorrect', async () => {
        const array = {
            title: 45,
            description: 82,
            date: []
        }
        const res = await request(app).post('/create').send(array);
        expect(res.status).toBe(500);
    })
});

describe('PUT/update', () => {
    test('should response with 200 status code', async () => {
        const array = {
            id: "1",
            title: "Test post",
            description: "This's test post",
            date: "14/6/2023"
        }

        const res = await request(app).put('/update').send(array)
        expect(res.status).toBe(200)
    })

    test('should response with 404 status code when data is mising', async () => {
        const array = {
            id: "",
            title: "Test post",
            description: "This's test post",
            date: "14/6/2023"
        }

        const res = await request(app).put('/update').send(array)
        expect(res.status).toBe(404)
    })

    test('should response with 500 status code when data type is incorrect', async () => {
        const array = {
            id: "1",
            title: 4654,
            description: 64,
            date: "14/6/2023"
        }

        const res = await request(app).put('/update').send(array)
        expect(res.status).toBe(500) 
    })
});


describe('DELETE/delete', () => {
    test('should response with 200 status code', async () => { 
        const response = await request(app).delete('/delete/?id=1')
        expect(response.status).toBe(200)
     })

     test('should response with an array lengh 1 object', async () => {
        const res = await request(app).delete('/delete/?id=3')
        expect(res.body).toBeInstanceOf(Object)
    })

    test('should response with 404 status code when id was missing', async () => {
        const res = await request(app).delete('/delete')
        expect(res.status).toBe(404)
    })

    test('should response with 404 status code when post is not found', async () => {
        const res = await request(app).delete('/delete/?id=22')
        expect(res.status).toBe(400)
    })
});