import { db } from '@/db';
import { projects } from '@/db/schema';

async function main() {
    const sampleProjects = [
        {
            title: 'Premium Residential Complex',
            division: 'construction',
            description: 'Luxury residential towers with world-class amenities including clubhouse, swimming pool, and landscaped gardens',
            status: 'Completed',
            location: 'Hyderabad, Telangana',
            duration: '24 months',
            image: null,
            tags: ['residential', 'luxury', 'high-rise'],
            createdAt: new Date('2022-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString(),
        },
        {
            title: 'Commercial Business Park Development',
            division: 'construction',
            description: 'Modern commercial complex with Grade A office spaces, retail outlets, and ample parking facilities',
            status: 'Ongoing',
            location: 'Bangalore, Karnataka',
            duration: '36 months',
            image: null,
            tags: ['commercial', 'office', 'retail'],
            createdAt: new Date('2022-06-01').toISOString(),
            updatedAt: new Date('2024-12-01').toISOString(),
        },
        {
            title: 'Corporate Legal Advisory Services',
            division: 'legal',
            description: 'Comprehensive legal support for corporate mergers, acquisitions, and compliance matters across multiple industries',
            status: 'Completed',
            location: 'Mumbai, Maharashtra',
            duration: '12 months',
            image: null,
            tags: ['corporate', 'compliance', 'advisory'],
            createdAt: new Date('2023-01-10').toISOString(),
            updatedAt: new Date('2024-01-10').toISOString(),
        },
        {
            title: 'Real Estate Legal Documentation',
            division: 'legal',
            description: 'End-to-end legal documentation and due diligence services for property transactions and development projects',
            status: 'Ongoing',
            location: 'Pune, Maharashtra',
            duration: '18 months',
            image: null,
            tags: ['real-estate', 'documentation', 'due-diligence'],
            createdAt: new Date('2023-07-01').toISOString(),
            updatedAt: new Date('2024-12-15').toISOString(),
        },
        {
            title: 'National Brand Launch Campaign',
            division: 'pr',
            description: 'Multi-channel PR campaign for product launch including media relations, influencer partnerships, and digital PR',
            status: 'Completed',
            location: 'Delhi NCR',
            duration: '6 months',
            image: null,
            tags: ['brand-launch', 'media-relations', 'digital-pr'],
            createdAt: new Date('2023-05-01').toISOString(),
            updatedAt: new Date('2023-11-01').toISOString(),
        },
        {
            title: 'Crisis Communication Management',
            division: 'pr',
            description: 'Strategic crisis communication and reputation management services for leading corporate client',
            status: 'Ongoing',
            location: 'Chennai, Tamil Nadu',
            duration: '9 months',
            image: null,
            tags: ['crisis-management', 'reputation', 'corporate'],
            createdAt: new Date('2024-04-01').toISOString(),
            updatedAt: new Date('2024-12-10').toISOString(),
        },
        {
            title: 'Annual Technology Summit 2024',
            division: 'events',
            description: 'Large-scale technology conference with 2000+ attendees, featuring keynote speakers, exhibitions, and networking sessions',
            status: 'Completed',
            location: 'Bangalore, Karnataka',
            duration: '3 months',
            image: null,
            tags: ['conference', 'technology', 'b2b'],
            createdAt: new Date('2024-06-01').toISOString(),
            updatedAt: new Date('2024-09-01').toISOString(),
        },
        {
            title: 'Corporate Annual Day Celebration',
            division: 'events',
            description: 'Grand corporate annual day event with cultural performances, awards ceremony, and gala dinner for 500+ employees',
            status: 'Ongoing',
            location: 'Hyderabad, Telangana',
            duration: '2 months',
            image: null,
            tags: ['corporate', 'celebration', 'entertainment'],
            createdAt: new Date('2024-11-01').toISOString(),
            updatedAt: new Date('2024-12-20').toISOString(),
        },
        {
            title: 'Eco-Friendly Tissue Production Facility',
            division: 'tissue',
            description: 'State-of-the-art tissue manufacturing unit with sustainable production processes and distribution network across South India',
            status: 'Completed',
            location: 'Vijayawada, Andhra Pradesh',
            duration: '18 months',
            image: null,
            tags: ['manufacturing', 'eco-friendly', 'distribution'],
            createdAt: new Date('2022-09-01').toISOString(),
            updatedAt: new Date('2024-03-01').toISOString(),
        },
    ];

    await db.insert(projects).values(sampleProjects);
    
    console.log('✅ Projects seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});