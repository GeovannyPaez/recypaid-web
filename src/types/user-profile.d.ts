export interface CreateUserProfileDto {
    name: string;
    lastname: string;
    city: string;
    address: string;
    phone: string;
}

export interface UserProfile {
    id: string,
    name: string,
    lastname: string,
    city: string,
    address: string,
    phone: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date
}