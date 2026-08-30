type SignUpProperties = {
    name: string;
    email: string;
    password: string;
}

type LoginProperties = {
    email: string;
    password: string;
    cookies: Record<string, string>
}

export type { SignUpProperties, LoginProperties }