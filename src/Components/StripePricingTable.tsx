import React, { useEffect } from "react";

interface StripePricingTableProps {
    id: string;
    publishableKey: string;
}

const StripePricingTable = ({ id, publishableKey }: StripePricingTableProps) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/pricing-table.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return React.createElement("stripe-pricing-table", {
        "pricing-table-id": id,
        "publishable-key": publishableKey
    });
};

export default StripePricingTable;