# Our Implementation of Atomic Design
Similar to the original concept of atomic design, we have structured our project to fit the smaller to larger scale. Here is how we follow the atomic design:

- Atom → Composed of the individual html tags and styles used throughout our system.

- Molecules → [/common/components](/common/components/README.md)

- Organisms → [/common/modules](/common/modules/README.md)

- Templates → [/common/templates](/common/templates/README.md)

- Pages → [/pages](/pages/README.md)

We additionally have a [/common/layouts](/common/layouts/README.md) section that is more of a supporting role for the templates.

# Why atomic?

As the craft of Web design continues to evolve, we’re recognizing the need to develop thoughtful design systems, rather than creating simple collections of web pages.

> ### We’re not designing pages, we’re designing systems of components.
> ###  <p style="text-align: right"> — Stephen Hay </p>

Interfaces are made up of smaller components. This means that we can break entire interfaces down into fundamental building blocks and work up from there.

# Atomic Design
Atomic design is methodology for creating design systems. There are five distinct levels in atomic design:

1. Atoms
2. Molecules
3. Organisms
4. Templates
5. Pages

![Atomic design][img1]

Let's explore each stage in more detail.

## Atoms
Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button.

![Atom example][img2]

Atoms can also include more abstract elements like color palettes, fonts and even more invisible aspects of an interface like animations.

Like atoms in nature they’re fairly abstract and often not terribly useful on their own. However, they’re good as a reference in the context of a pattern library as you can see all your global styles laid out at a glance.

## Molecules
Things start getting more interesting and tangible when we start combining atoms together. Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound. These molecules take on their own properties and serve as the backbone of our design systems.

For example, a form label, input or button aren’t too useful by themselves, but combine them together as a form and now they can actually do something together.

![Molecule example][img3]

Building up to molecules from atoms encourages a “do one thing and do it well” mentality. While molecules can be complex, as a rule of thumb they are relatively simple combinations of atoms built for reuse.

## Organisms
Molecules give us some building blocks to work with, and we can now combine them together to form organisms. Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.

![Organism example][img4]
![Organism supporting example][img5]

We’re starting to get increasingly concrete. A client might not be terribly interested in the molecules of a design system, but with organisms we can see the final interface beginning to take shape. Dan Mall (who I’m working with on several projects) uses element collages, which articulate ideas for a few key organisms to facilitate client conversations and shape the visual direction (all without having to construct full comps).

Organisms can consist of similar and/or different molecule types. For example, a masthead organism might consist of diverse components like a logo, primary navigation, search form, and list of social media channels. But a “product grid” organism might consist of the same molecule (possibly containing a product image, product title and price) repeated over and over again.

Building up from molecules to organisms encourages creating standalone, portable, reusable components.

## Templates
At the template stage, we break our chemistry analogy to get into language that makes more sense to our clients and our final output. Templates consist mostly of groups of organisms stitched together to form pages. It’s here where we start to see the design coming together and start seeing things like layout in action.

![Template example][img6]

Templates are very concrete and provide context to all these relatively abstract molecules and organisms. Templates are also where clients start seeing the final design in place. In my experience working with this methodology, templates begin their life as HTML wireframes, but over time increase fidelity to ultimately become the final deliverable. Bearded Studio in Pittsburgh follow a similar process, where designs start grayscale and layout-less but slowly increase fidelity until the final design is in place.

## Pages
Pages are specific instances of templates. Here, placeholder content is replaced with real representative content to give an accurate depiction of what a user will ultimately see.

![Page example][img7]

Pages are the highest level of fidelity and because they’re the most tangible, it’s typically where most people in the process spend most of their time and what most reviews revolve around.

The page stage is essential as it’s where we test the effectiveness of the design system. Viewing everything in context allows us to loop back to modify our molecules, organisms, and templates to better address the real context of the design.

Pages are also the place to test variations in templates. For example, you might want to articulate what a headline containing 40 characters looks like, but also demonstrate what 340 characters looks like. What does it look like when a user has one item in their shopping cart versus 10 items with a discount code applied? Again, these specific instances influence how we loop back through and construct our system.

[img1]: https://bradfrost.com/wp-content/uploads/2013/06/atomic-design.png
[img2]: https://bradfrost.com/wp-content/uploads/2013/06/atoms.jpg
[img3]: https://bradfrost.com/wp-content/uploads/2013/06/molecule.jpg
[img4]: https://bradfrost.com/wp-content/uploads/2013/06/organism2.jpg
[img5]: https://bradfrost.com/wp-content/uploads/2013/06/organism-examples.jpg
[img6]: https://bradfrost.com/wp-content/uploads/2013/06/template1.jpg
[img7]: https://bradfrost.com/wp-content/uploads/2013/06/page1.jpg