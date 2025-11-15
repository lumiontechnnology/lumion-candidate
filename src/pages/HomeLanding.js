import React from 'react';
import { Box } from '@mui/material';
import Hero from '../components/landing/Hero';
import StatStrip from '../components/landing/StatStrip';
import CategoryGrid from '../components/landing/CategoryGrid';
import JobCirculars from '../components/landing/JobCirculars';
import PaymentsSimplified from '../components/landing/PaymentsSimplified';
import GlobalReach from '../components/landing/GlobalReach';
import Testimonials from '../components/landing/Testimonials';

export default function HomeLanding() {
  return (
    <Box>
      <Hero />
      <StatStrip />
      <CategoryGrid />
      <JobCirculars />
      <PaymentsSimplified />
      <GlobalReach />
      <Testimonials />
    </Box>
  );
}