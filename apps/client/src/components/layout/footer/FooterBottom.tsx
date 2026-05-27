import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
} from "react-icons/fa";

export default function FooterBottom() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8 text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
      <div className="flex items-center gap-4 text-2xl text-gray-500">
        <FaCcVisa />
        <FaCcMastercard />
        <FaCcPaypal />
        <FaCcStripe />
      </div>
    </div>
  );
}
