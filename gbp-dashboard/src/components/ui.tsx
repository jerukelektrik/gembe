import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes
} from 'react';

type Tone = 'default' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'danger' | 'info';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function buttonClassName(variant: Tone = 'default', size: 'sm' | 'md' | 'icon' = 'md', className?: string) {
  return cn('ui-button', `ui-button-${variant}`, `ui-button-${size}`, className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Tone;
  size?: 'sm' | 'md' | 'icon';
}

export function Button({ variant = 'default', size = 'md', className, ...props }: ButtonProps) {
  return <button className={buttonClassName(variant, size, className)} {...props} />;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Tone;
  size?: 'sm' | 'md' | 'icon';
}

export function ButtonLink({ variant = 'outline', size = 'md', className, ...props }: ButtonLinkProps) {
  return <a className={buttonClassName(variant, size, className)} {...props} />;
}

export function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('ui-card', className)} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('ui-card-header', className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('ui-card-title', className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('ui-card-description', className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('ui-card-content', className)} {...props} />;
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Tone;
}

export function Badge({ variant = 'secondary', className, ...props }: BadgeProps) {
  return <span className={cn('ui-badge', `ui-badge-${variant}`, className)} {...props} />;
}

export function Field({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('ui-field', className)} {...props} />;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('ui-input', className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('ui-select', className)} {...props} />;
}

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Tone;
}

export function Alert({ variant = 'info', className, ...props }: AlertProps) {
  return <div className={cn('ui-alert', `ui-alert-${variant}`, className)} {...props} />;
}

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('ui-skeleton', className)} {...props} />;
}

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('ui-tabs-list', className)} role="tablist" {...props} />;
}

interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function TabsTrigger({ active = false, className, ...props }: TabsTriggerProps) {
  return <button className={cn('ui-tabs-trigger', active && 'is-active', className)} role="tab" aria-selected={active} {...props} />;
}
