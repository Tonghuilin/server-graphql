const base = `
    enum Role {
        ADMIN
        REVIEWER
        EDITOR
        USER
    }

    directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION
`;

module.exports = {
    base,
};
