# Shivam Singh - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Material-UI. This project showcases my skills, projects, and provides a professional way for potential employers and clients to get in touch.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **TypeScript**: Type-safe code for better development experience
- **Material-UI**: Consistent, accessible UI components
- **Animations**: Smooth scroll animations using Framer Motion
- **Contact Form**: Functional contact form with validation
- **Portfolio Showcase**: Beautiful project cards with technology tags
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **UI Framework**: Material-UI (MUI)
- **Animations**: Framer Motion
- **Styling**: Material-UI System (sx prop)
- **Icons**: Material-UI Icons
- **Scroll**: React Scroll
- **Intersection Observer**: React Intersection Observer

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devshvms/shvms-portfolio.git
   cd shvms-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── navbar/         # Navigation component
│   ├── intro/          # Hero section
│   ├── skills/         # Skills showcase
│   ├── works/          # Portfolio projects
│   ├── contacts/       # Contact form
│   └── footer/         # Footer component
├── assets/             # Images and static files
├── theme/              # Material-UI theme configuration
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

## 🎨 Customization

### Colors and Theme
The color scheme can be customized in `src/theme/theme.ts`:

```typescript
export const theme = createTheme({
  palette: {
    primary: {
      main: '#EFC430', // Your brand color
    },
    // ... other theme options
  },
});
```

### Content Updates
- **Personal Information**: Update contact details in `src/components/contacts/contacts.tsx`
- **Projects**: Modify project data in `src/components/works/works.tsx`
- **Skills**: Update skills in `src/components/skills/skills.tsx`
- **Social Links**: Update social media links in footer and contact components

### Images
Replace images in the `src/assets/` directory:
- Portfolio project images
- Skill icons
- Profile pictures

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

- **Email**: dev.shvms@gmail.com
- **LinkedIn**: [Shivam Singh](https://linkedin.com/in/shivamsingh361)
- **GitHub**: [Your GitHub](https://github.com/devshvms)

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the component library
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Scroll](https://github.com/fisshy/react-scroll) for smooth scrolling
- [Create React App](https://create-react-app.dev/) for the project setup

---

Made with ❤️ by Shivam Singh
