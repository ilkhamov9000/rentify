declare module 'lucide-react-native' {
  import React from 'react';
  
  interface IconProps {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    style?: any;
    [key: string]: any;
  }
  
  type Icon = React.FC<IconProps>;
  
  export const Home: Icon;
  export const Search: Icon;
  export const Heart: Icon;
  export const MessageSquare: Icon;
  export const User: Icon;
  export const MapPin: Icon;
  export const Map: Icon;
  export const Bed: Icon;
  export const Bath: Icon;
  export const Car: Icon;
  export const ShieldCheck: Icon;
  export const SlidersHorizontal: Icon;
  export const LayoutDashboard: Icon;
  export const Users: Icon;
  export const LogOut: Icon;
  export const ChevronRight: Icon;
  export const Shield: Icon;
  export const Filter: Icon;
  export const CheckCircle: Icon;
  export const XCircle: Icon;
  export const Clock: Icon;
  export const ChevronDown: Icon;
  export const Mail: Icon;
  export const Calendar: Icon;
  export const Phone: Icon;
  export const Ruler: Icon;
  export const Activity: Icon;
}