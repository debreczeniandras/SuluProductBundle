<?php

namespace Sulu\Bundle\ProductBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NoResultException;

/**
 * ProductRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ProductRepository extends EntityRepository
{
    public function findByIdAndLanguage($id, $lang)
    {
        try {
            $qb = $this->createQueryBuilder('product')
                ->leftJoin('product.productAttributes', 'productAttributes')
                ->leftJoin('product.translations', 'translations')
                ->leftJoin('product.addons', 'addons')
                ->leftJoin('product.children', 'children')
                ->where('product.id = :productId')
                ->andWhere('translations.languageCode = :languageCode')
                ->setParameter('productId', $id)
                ->setParameter('languageCode', $lang);

            $query = $qb->getQuery();
            return $query->getSingleResult();

        } catch (NoResultException $ex) {
            return null;
        }
    }

    public function findByParameters($parameters)
    {
        try {
            $qb = $this->createQueryBuilder('product')
                ->leftJoin('product.productAttributes', 'productAttributes')
                ->leftJoin('product.translations', 'translations')
                ->leftJoin('product.addons', 'addons')
                ->leftJoin('product.children', 'children')
                ->where('translations.languageCode = :languageCode');

            foreach ($parameters as $key => $value) {
                switch ($key) {
                    case 'language':
                        $qb->setParameter('languageCode', $value);
                        break;

                    case 'status':
                        $qb->leftJoin('product.status', 'productStatus');
                        $qb->andWhere('productStatus.id = :' . $key);
                        $qb->setParameter($key, $value);
                        break;

                    case 'type':
                        $qb->leftJoin('product.type', 'productType');
                        $qb->andWhere('productType.id = :' . $key);
                        $qb->setParameter($key, $value);
                        break;

                    case 'code':
                        $qb->andWhere('product.code = :' . $key);
                        $qb->setParameter($key, $value);
                        break;

                    case 'number':
                        $qb->andWhere('product.number = :' . $key);
                        $qb->setParameter($key, $value);
                        break;
                }
            }

            $query = $qb->getQuery();
            return $query->getResult();
        } catch (NoResultException $ex) {
            return null;
        }
    }
}
