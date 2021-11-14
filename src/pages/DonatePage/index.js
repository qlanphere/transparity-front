import React, { useEffect, useRef } from 'react'
import './DonatePage.css'

function DonatePage() {

    // const paypal = useRef()
    // useEffect(() => {
    //     console.log('we here')
    //     window.paypal.Buttons({
    //         cureateOrder: (data, actions, err) => {
    //             return actions.order.create({
    //                 intent: "CAPTURE",
    //                 purchase_units: [{
    //                     description: "Donating to Greenpeace Post1",
    //                     amount: {
    //                         currency_code: "GBP",
    //                         value: 350.00,
    //                     }
    //                 }]
    //             })
    //         },
    //         onApprove: async (data, actions) => {
    //             const order = await actions.order.capture()
    //             console.log(order)
    //         },
    //         onError: (err) => {
    //             console.log(err)
    //         }
    //     }).render(paypal.current)
    // }, [])
    // return (
    //     <div>
    //         <h1>Donate</h1>
    //         <div>{paypal}</div>
    //     </div>
    // )

    const paypal = useRef();

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            description: "Donating to Greenpeace Post1",
                            amount: {
                                currency_code: "GBP",
                                value: 350.00,
                            }
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <h1 className="donate-page-title">Donate</h1>
            <div className="paypal-container" ref={paypal}></div>
        </div>
    );

}

export default DonatePage
