export interface buttonProps{
 
    Icon : React.ReactChild[] | any;
    variant? : any,
    type : 'submit' | 'reset' | 'button';
    disabled: boolean,
    text: string,
    onClick?: () => void
}