export interface TemplateEmail {
    subject: string;
    message: string;
    image?: string;
    action?: {
        link: string;
        text: string;
    }[];
    to: {
        name: string;
        email: string | string[];
    };
    from?: {
        name: string;
        email: string;
    };
}
export declare const emailTemplate: (payload: TemplateEmail) => string;
