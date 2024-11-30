import React from 'react';
import { Form, Input } from 'antd';

const OwnerPortfolioForm: React.FC = () => {
    return (
        <div className="form-grid">
            <Form.Item name="ownerName" label={<span className="required">Owner Name</span>}>
                <Input placeholder="Enter owner name" />
            </Form.Item>
            <Form.Item name="ownerEmail" label={<span className="required">Owner Email</span>}>
                <Input placeholder="Enter owner email" />
            </Form.Item>
            {/* Add more fields as needed */}
        </div>
    );
};

export default OwnerPortfolioForm;

