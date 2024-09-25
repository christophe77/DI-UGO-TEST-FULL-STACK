<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Customer;
use App\Entity\Order;

#[Route('/api', name: 'api_')]
class CustomerController extends AbstractController
{
    #[Route('/customers', name: 'app_customers', methods:['get'] )]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $customers = $doctrine
            ->getRepository(Customer::class)
            ->findAll();
   
        return $this->json($customers);
    }
    #[Route('/customers/{customer_id}/orders', name: 'app_customer_orders', methods:['get'])]
    public function showOrders(ManagerRegistry $doctrine, int $customer_id): JsonResponse
    {
        $customer_orders = $doctrine
            ->getRepository(Order::class)
            ->findBy(
                ['customer_id' => $customer_id]
            );
            if (!$customer_orders) {
                return $this->json('No orders found for customer ' . $customer_id, 404);
            }
        return $this->json($customer_orders);
    }
}
