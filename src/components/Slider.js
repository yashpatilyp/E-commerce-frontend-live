import React from 'react'

export default function Slider() {
  return (
    <div>
     <div id="carouselExampleDark" className="carousel carousel-dark slide">
  {/* Carousel Inner */}
  <div className="carousel-inner">
    {/* Section Heading */}
    <h1>FEATURED PRODUCTS</h1>
    {/* First Carousel Item */}
    <div className="carousel-item active" data-bs-interval={1000}>
      {/* Product Cards Row */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {/* Product Card 1 */}
        <div className="col card-hide card-hide-sm">
          {/* Card Structure */}
          <div className="card h-100">
            {/* Card Image */}
            <img
              src="https://i.pinimg.com/564x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg"
              className="card-img-top"
              alt="..."
            />
            {/* Card Body */}
            <div className="card-body">
              {/* Card Title */}
              <h5 className="card-title">MEN'S SHIRTS CASUAL, COOL</h5>
              {/* Card Text */}
              <p className="card-text">
                A shirt like no other! The look of a rugged plaid flannel shirt
                with the warmth and comfort of heavyweight fleece.
              </p>
            </div>
            {/* Card Footer */}
            <div className="card-footer">
              {/* Shopping Cart Icon */}
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              {/* Price and Size */}
              <div>
                <h5>
                  ₹ 1000 /-
                  <p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col card-hide-sm">
          <div className="card h-100">
            <img
              src="https://i.pinimg.com/564x/77/df/66/77df66cfb979087e2b931b9463678c9d.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">IVORY BLOCK-PRINTED MEN'S SHIRT</h5>
              <p className="card-text">
                Burton develops snowboards, boots, bindings, outerwear, apparel,
                and bags for the most demanding riders. Drop in today.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              <div>
                <h5>
                  ₹ 1000 /-
                  <p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src="https://i.pinimg.com/564x/a9/d7/da/a9d7da796f5b66262ec4c710e4f9f521.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">MEN'S NAVIGATOR FLEECE SHIRT</h5>
              <p className="card-text">
                Fewer fabrics are softer to the touch than the fleece of our
                Navigator. We made it thicker to trap heat better, too. Even if
                you were raised on cotton, once you give this polyester fleece a
                try, you'll never go back!.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              <div>
                <h5>
                  ₹ 1000 /-
                  <p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 card-hide-sm card-hide">
            <img
              src="https://i.pinimg.com/564x/a9/d7/da/a9d7da796f5b66262ec4c710e4f9f521.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">MEN'S NAVIGATOR FLEECE SHIRT</h5>
              <p className="card-text">
                Fewer fabrics are softer to the touch than the fleece of our
                Navigator. We made it thicker to trap heat better, too. Even if
                you were raised on cotton, once you give this polyester fleece a
                try, you'll never go back!.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              <div>
                <h5>
                  ₹ 1000 /-
                  <p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* .................................................................................................................  */}
    {/* Carousel Item */}
    <div className="carousel-item" data-bs-interval={2000}>
      {/* Row of Product Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {/* Product Card 1 */}
        <div className="col card-hide card-hide-sm">
          {/* Card Structure */}
          <div className="card h-100">
            {/* Card Image */}
            <img
              src="https://i.pinimg.com/564x/c9/ef/51/c9ef5171b624ff41ec60e5b6539da08a.jpg"
              className="card-img-top"
              alt="..."
            />
            {/* Card Body */}
            <div className="card-body">
              {/* Card Title */}
              <h5 className="card-title">
                Cold Shoulder Crop Top Ruffle Layered Top
              </h5>
              {/* Card Text */}
              <p className="card-text">
                3 pieces combo, ruffles layers crop top with flower printed
                skirt, comes with necklace. This dress is perfect for easter,
                special occasion.
              </p>
            </div>
            {/* Card Footer */}
            <div className="card-footer">
              {/* Shopping Cart Icon */}
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              {/* Price and Size */}
              <div>
                <h5>
                  {" "}
                  ₹ 1000 /-<p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col card-hide card-hide-sm">
          <div className="card h-100">
            <img
              src="https://i.pinimg.com/564x/2c/7b/f5/2c7bf5fcb2a664fcb83651fba8e3800b.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Sleeve Fashion Sweatshirts</h5>
              <p className="card-text">
                FEATURES:girls hoodies with long sleeve, patterned outerwear
                casual loose tops
                OCCASION:summer,fall,spring,park,vacation,school,playing.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              <div>
                <h5>
                  ₹ 1000 /-
                  <p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col card-hide-sm">
          <div className="card h-100">
            <img
              src="https://i.pinimg.com/564x/5c/7a/9f/5c7a9f848b0d57cce7473cba1d40bffe.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Top + Floral Wide Leg Pants</h5>
              <p className="card-text">
                100% Cotton Elastic closure Hand Wash Only Material: Cotton
                blend. Cute baby girl Halloween clothes set, infant girl
                Halloween outfits, halter top and flared pants set for newborn
                toddler.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              <div>
                <h5>
                  ₹ 1000 /-
                  <p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src="https://i.pinimg.com/736x/e0/b1/a6/e0b1a64ef80423de3410c760524e4a05.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Trendy Summer Outfits</h5>
              <p className="card-text">
                Summer outfits can be trendy, but the styles come and go.
                Everyone loves the summer, so here is the summer 2020 guide for
                outfits you can wear during the day, and at night
              </p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              <div>
                <h5>
                  ₹ 1000 /-
                  <p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* ......................................................................................................................  */}
    <div className="carousel-item">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        <div className="col card-hide card-hide-sm">
          <div className="card h-100">
            <img
              src="https://i.pinimg.com/564x/69/2b/0a/692b0a2cda399231b0d5685e3615b497.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">MOMOLAND Toddler Boys Short</h5>
              <p className="card-text">
                Soft Woven Fabric with Linen Effect Folded Cuffs and Curved
                Shirttail Hem White, Off White, Light Blue, Light Khaki, There
                is Always A Color for Your Little One
              </p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              <div>
                <h5>
                  ₹ 1000 /-
                  <p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col card-hide card-hide-sm">
          <div className="card h-100">
            <img
              src="https://i.pinimg.com/564x/e1/ec/41/e1ec4187510736629436c525032d29ef.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">
                SWEAT COLOR BLOCK EN COTON BIOLOGIQUE
              </h5>
              <p className="card-text">
                Sweat en molleton tout doux, gratté à l'intérieur. Color block.
                Bords-côtes aux manches, au col et à la base.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              <div>
                <h5>
                  ₹ 1000 /-
                  <p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col card-hide-sm">
          <div className="card h-100">
            <img
              src="https://i.pinimg.com/564x/77/df/66/77df66cfb979087e2b931b9463678c9d.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">IVORY BLOCK-PRINTED MEN'S SHIRT</h5>
              <p className="card-text">
                Burton develops snowboards, boots, bindings, outerwear, apparel,
                and bags for the most demanding riders. Drop in today.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              <div>
                <h5>
                  ₹ 1000 /-
                  <p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src="https://i.pinimg.com/564x/d6/01/90/d6019018019464daafc8cef63d1ac1e9.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Conjunto de ropa para niños</h5>
              <p className="card-text">
                Free shipping. Free returns. All the time. Shop online for
                shoes, clothing, jewelry, dresses, makeup and more from top
                brands.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              <div>
                <h5>
                  ₹ 1000 /-
                  <p>₹ 1500 /-</p>
                </h5>
                <span>Size: M,L,XL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleDark"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleDark"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

    </div>
  )
}
