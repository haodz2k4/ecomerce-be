

//USER 
export enum UserGenderEnum {
    MALE = 'male',
    FEMALE = 'female'
} 

export enum UserStatusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

//Roles 
export enum RoleStatusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

//Permissions 
export enum PermissionNameEnum {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete'
}

export enum PermissionResourceEnum {
    USERS = 'users',
    PRODUCTS = 'products',
    CATEGORIES = 'categories',
    INVENTORIES = 'inventories',
    ROLES = 'roles',
    PERMISSIONS = 'permissions',
    ORDERS = 'orders'
}
//Products
export enum ProductStatusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

//Categories 
export enum CategoryStatusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}