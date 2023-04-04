export const modelMap = {
    delivery: {
        dbFields: [
            "_id",
            "projectId",
            "amount",
            "clientId",
            "employeeId",
            "type", // 'Deposit', 'Payment'
            "method", // 'Cash', 'Cheque', 'e-Transfer', 'Credit Card'
            "status", // 'Received', 'Deposited'
            "created",
            "updated",
        ],
        listFields: [],
        detailsFields: [],
    },
    payment: {
        dbFields: [
            "_id",
            "projectId",
            "amount",
            "clientId",
            "employeeId",
            "type",     // 'Deposit', 'Payment'
            "method",   // 'Cash', 'Cheque', 'e-Transfer', 'Credit Card'
            "status",   // 'Received', 'Deposited'
            "created",
            "updated",
        ],
        listFields: [
            "amount",
            "type",     // 'Deposit', 'Payment'
            "method",   // 'Cash', 'Cheque', 'e-Transfer', 'Credit Card'
            "created",
        ],
        detailsFields: [],
    },
}