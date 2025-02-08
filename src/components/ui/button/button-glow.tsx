import React from "react"
import classes from "./button-glow.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    children: React.ReactNode;
    className?: string;
}

const ButtonGlow = React.forwardRef(
    function ButtonGlow(
        { children, ...props }: Props, 
        ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
        ref={ref}
        className={classes.button}
        {...props}
    >
        <div className={classes.glow_container}>
            <div className={classes.glow}></div>
        </div>
        <div className={classes.inner_button}> 
            {children}
        </div>
    </button>
  )
});

export default ButtonGlow;