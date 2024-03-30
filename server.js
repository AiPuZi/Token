const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// 读取配置文件
const config = require('./config.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/create-token', async (req, res) => {
    try {
        // 模拟创建代币的逻辑，实际上您需要调用智能合约
        console.log('Creating token with the following data:', req.body);

        // 假设的响应数据
        const response = {
            transactionId: 'simulated_transaction_id'
        };

        res.json(response);
    } catch (error) {
        console.error('Error creating token:', error);
        res.status(500).send('Failed to create token');
    }
});

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});