# CVOWF Brand Color Implementation Guide

## Official Brand Colors (Non-Negotiable)

### Primary Colors

- **Deep Purple / Royal Purple**: `#4B2E83` - Represents leadership, dignity
- **Warm Gold / Orange**: `#F5A623` - Represents courage, hope

### Background Colors

- **Clean White**: `#FFFFFF` - Primary backgrounds
- **Soft Light Gray**: `#F5F6F8` - Secondary backgrounds

## Implementation Status ✅

### Tailwind Configuration (`tailwind.config.js`)

- ✅ Updated color palette with CVOWF brand colors
- ✅ Primary purple scale (50-900) with #4B2E83 as primary-700
- ✅ Secondary gold scale (50-900) with #F5A623 as secondary-500
- ✅ Brand-specific color definitions

### CSS Framework (`src/index.css`)

- ✅ CSS custom properties for brand colors
- ✅ Updated all component classes (btn-primary, btn-secondary, etc.)
- ✅ Brand-specific utility classes
- ✅ Consistent focus ring colors using primary-700
- ✅ Text gradient utilities using brand colors

### Components Updated

- ✅ **HeroSection**: Background gradient, buttons, stats card
- ✅ **Navigation**: Logo, links, mobile menu
- ✅ **DonationWidget**: Amount buttons, hover states
- ✅ **ImpactStats**: Background, icons, text colors
- ✅ **ProgramCard**: Urgent banner using secondary-500
- ✅ **VolunteerCTA**: Background gradient, buttons
- ✅ **Footer**: Logo, social media buttons, borders

### Dashboard Components Updated

- ✅ **AdminDashboard**: Stats icons and colors
- ✅ **VolunteerDashboard**: Stats, links, badges
- ✅ **DonorDashboard**: Icons, badges, links

### Utility Classes Available

```css
/* Background Gradients */
.bg-brand-gradient           /* Primary purple gradient */
.bg-brand-gradient-light     /* Light brand gradient */
.bg-brand-accent-gradient    /* Gold accent gradient */

/* Text Colors */
.text-brand-primary          /* Primary purple text */
.text-brand-secondary        /* Secondary gold text */
.text-gradient               /* Purple to gold gradient */
.text-gradient-reverse       /* Gold to purple gradient */
```

### CSS Custom Properties Available

```css
:root {
  --color-brand-primary: #4b2e83;
  --color-brand-secondary: #f5a623;
  --color-brand-white: #ffffff;
  --color-brand-light: #f5f6f8;
}
```

## Design Guidelines for Generated Content

### Visual Requirements

- **Dominant Colors**: Use primary purple (#4B2E83) for main elements
- **Accent Colors**: Use warm gold (#F5A623) sparingly for highlights
- **Backgrounds**: Clean white or soft light gray only
- **Style**: Flat or semi-flat, modern NGO aesthetic
- **Contrast**: Maintain WCAG AA minimum compliance

### For AI Image Generation

When generating images, illustrations, or graphics:

- Primary palette: Deep purple (#4B2E83) and warm gold (#F5A623)
- Avoid random or default colors
- Use purple for primary shapes, figures, outlines
- Use gold for highlights, emphasis, motion cues, CTAs
- Clean, professional humanitarian aesthetic
- Avoid decorative noise or overly complex gradients

### Brand Voice in Visuals

- Leadership and dignity (purple dominance)
- Courage and hope (gold accents)
- Trustworthy and empowering
- Community transformation focused
- Timeless, not trendy

## Technical Implementation Notes

### Accessibility

- All color combinations maintain WCAG AA contrast ratios
- Focus indicators use consistent primary-700 color
- High contrast mode support maintained

### Scalability

- Colors centralized in Tailwind config for easy maintenance
- CSS custom properties for non-Tailwind contexts
- Brand color utility functions available in `src/data/brandColors.js`

### File References

- **Main Config**: `tailwind.config.js`
- **CSS Framework**: `src/index.css`
- **Brand Constants**: `src/data/brandColors.js`
- **Usage Notes**: `src/data/constants.js`

## Future Considerations

### Image Assets

- All placeholder images (`/api/placeholder/*`) should be replaced with brand-compliant versions
- SVG icons should use brand colors where appropriate
- Generated illustrations must follow brand color guidelines

### Development Guidelines

- Always use Tailwind brand classes (primary-_, secondary-_) over arbitrary colors
- Use brand utility classes for consistent application
- Reference brand constants file for programmatic color usage
- Test color combinations for accessibility compliance

---

_This implementation ensures complete brand consistency across the CVOWF application, reinforcing the foundation's identity of women empowerment, courage, dignity, equality, and community transformation through every visual element._
