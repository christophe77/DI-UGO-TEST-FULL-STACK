<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Customer;
use App\Entity\Order;

#[AsCommand(
    name: 'ugo:orders:import',
    description: 'Import orders from csv file.',
    hidden: false
)]
class OrdersImportCommand extends Command
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;

        parent::__construct();
    }
    public static function getRootDir(): string
    {
        return __DIR__;
    }
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln([
            'importing customers...',
            '',
        ]);
        $this->importCustomersCSV();
        $output->writeln([
            'importing purchases...',
            '',
        ]);
        $this->importPurchasesCSV();
        return Command::SUCCESS;
    }
    private function importCustomersCSV()
    {
        $em = $this->entityManager;
        $repository = $em->getRepository(Customer::class);
        $entities = $repository->findAll();
    
        foreach ($entities as $entity) {
            $em->remove($entity);
        }
        $em->flush();

        $projectRoot = $this->getRootDir();
        $csvPath = realpath($projectRoot . '/../Resources/csv/customers.csv');

        if (($handle = fopen($csvPath, "r")) !== FALSE) {
            $i = 0;
            while (($data = fgetcsv($handle, 10000, ";")) !== FALSE) {
                $i++;
                if ($i == 1) { continue; }

                $entityCustomer = new Customer();
        
                $entityCustomer->setCustomerId(intval($data[0]));
                $entityCustomer->setTitle(intval($data[1]));
                $entityCustomer->setLastname($data[2]);
                $entityCustomer->setFirstname($data[3]);
                $entityCustomer->setPostalCode($data[4]);
                $entityCustomer->setCity($data[5]);
                $entityCustomer->setEmail($data[6]);

                $em->persist($entityCustomer);
                $em->flush();
            }
        }
    }
    private function importPurchasesCSV()
    {
        $em = $this->entityManager;
        $repository = $em->getRepository(Order::class);
        $entities = $repository->findAll();
    
        foreach ($entities as $entity) {
            $em->remove($entity);
        }
        $em->flush();

        $projectRoot = $this->getRootDir();
        $csvPath = realpath($projectRoot . '/../Resources/csv/purchases.csv');

        if (($handle = fopen($csvPath, "r")) !== FALSE) {
            $i = 0;
            while (($data = fgetcsv($handle, 10000, ";")) !== FALSE) {
                $i++;
                if ($i == 1) { continue; }

                $entityOrder = new Order();
        
                $entityOrder->setPurchaseIdentifier($data[0]);
                $entityOrder->setCustomerId(intval($data[1]));
                $entityOrder->setProductId(intval($data[2]));
                $entityOrder->setQuantity(intval($data[3]));
                $entityOrder->setPrice(intval($data[4]));
                $entityOrder->setCurrency($data[5]);
                $entityOrder->setDate($data[6]);

                $em->persist($entityOrder);
                $em->flush();
            }
        }
    }
}