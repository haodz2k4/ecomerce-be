

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

//Orders 
export enum OrderStatusEnum {
    PENDING  ='pending',
    CONFIRMED ='confirmed',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELED = 'canceled',
    FAILED = 'failed'   
}
//Orders 
export enum PaymentMethodEnum {
    CASH = 'cash',
    CREDIT_CARD = 'credit_card'
}

//Users_provider 
export enum UserProviderEnum {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    GITHUB = 'github'
}